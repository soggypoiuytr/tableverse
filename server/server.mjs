import http from 'node:http';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {initializeApp,cert} from 'firebase-admin/app';
import {readFileSync} from 'node:fs';
import {getAuth} from 'firebase-admin/auth';
const config={client:process.env.DISCORD_CLIENT_ID,secret:process.env.DISCORD_CLIENT_SECRET,redirect:process.env.DISCORD_REDIRECT_URI,origin:process.env.TABLEVERSE_ORIGIN,project:process.env.FIREBASE_PROJECT_ID};
for(const [key,value] of Object.entries(config))if(!value)throw new Error(`Configuração ausente: ${key}`);
if(config.project!=='tableverse-78c7d')throw new Error('O projeto Firebase precisa ser o projeto exclusivo do Tableverse.');
const callback=new URL(config.redirect),frontend=new URL(config.origin),origin=frontend.origin,returnTo=frontend.href,allowedOrigins=new Set([origin,'http://127.0.0.1:4177','http://localhost:4177']);
const serviceAccount=JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS,'utf8'));if(serviceAccount.project_id!==config.project)throw Error('Credencial Firebase pertence a outro projeto.');initializeApp({credential:cert(serviceAccount),projectId:config.project});
const auth=getAuth(),states=new Map(),sessions=new Map();
const clean=setInterval(()=>{const now=Date.now();for(const map of [states,sessions])for(const [key,value]of map)if(value.expires<now)map.delete(key)},60000);clean.unref();
const cookieName='tableverse_oauth';
function json(res,status,value){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(value))}
function redirect(res,url){res.writeHead(302,{Location:url});res.end()}
function cookies(req){return Object.fromEntries((req.headers.cookie||'').split(';').map(s=>s.trim().split('=')))}
function same(a,b){return typeof a==='string'&&typeof b==='string'&&a.length===b.length&&timingSafeEqual(Buffer.from(a),Buffer.from(b))}
function token(){return randomBytes(32).toString('hex')}
async function discord(url,options){const r=await fetch(url,{...options,signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error('Discord indisponível ou autorização recusada');return r.json()}
const server=http.createServer(async(req,res)=>{
res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');
if(allowedOrigins.has(req.headers.origin)){res.setHeader('Access-Control-Allow-Origin',req.headers.origin);res.setHeader('Vary','Origin')}
try{const url=new URL(req.url,callback.origin);
if(req.method==='OPTIONS'){if(!allowedOrigins.has(req.headers.origin))return json(res,403,{error:'Origem inválida'});res.setHeader('Access-Control-Allow-Methods','POST, GET');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.writeHead(204);return res.end()}
if(url.pathname==='/health')return json(res,200,{project:config.project,configured:true});
if(req.method==='GET'&&url.pathname==='/auth/discord/start'){
if(states.size>1000)return json(res,429,{error:'Tente novamente mais tarde'});
const state=token(),browser=token();states.set(state,{browser,expires:Date.now()+300000});res.setHeader('Set-Cookie',`${cookieName}=${browser}; HttpOnly; SameSite=Lax; Path=/auth/discord; Max-Age=300${callback.protocol==='https:'?'; Secure':''}`);
const dest=new URL('https://discord.com/oauth2/authorize');dest.search=new URLSearchParams({client_id:config.client,response_type:'code',redirect_uri:config.redirect,scope:'identify',state}).toString();return redirect(res,dest.href)}
if(req.method==='GET'&&url.pathname==='/auth/discord/callback'){
const state=url.searchParams.get('state'),pending=states.get(state);states.delete(state);res.setHeader('Set-Cookie',`${cookieName}=; HttpOnly; SameSite=Lax; Path=/auth/discord; Max-Age=0`);
if(!pending||pending.expires<Date.now()||!same(pending.browser,cookies(req)[cookieName]))return json(res,400,{error:'Login expirado. Abra o login novamente pelo Tableverse.'});
if(url.searchParams.has('error'))return redirect(res,returnTo+'#discord_error=cancelled');
const code=url.searchParams.get('code');if(!code)return json(res,400,{error:'Código de autorização ausente'});
const grant=await discord('https://discord.com/api/v10/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:config.client,client_secret:config.secret,grant_type:'authorization_code',code,redirect_uri:config.redirect})});
const user=await discord('https://discord.com/api/v10/users/@me',{headers:{Authorization:`Bearer ${grant.access_token}`}});
if(!/^\d{15,22}$/.test(user.id))throw Error('Identidade Discord inválida');
const uid='discord:'+user.id,displayName=(user.global_name||user.username).slice(0,100),fallback=Number((BigInt(user.id)>>22n)%6n),photoURL=user.avatar?`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_')?'gif':'png'}?size=128`:`https://cdn.discordapp.com/embed/avatars/${fallback}.png`;
try{const existing=await auth.getUser(uid);await auth.updateUser(uid,existing.providerData.some(p=>p.providerId==='password')?{photoURL}:{displayName,photoURL})}catch(e){if(e.code!=='auth/user-not-found')throw e;await auth.createUser({uid,displayName,photoURL})}
const customToken=await auth.createCustomToken(uid),ticket=token();sessions.set(ticket,{customToken,profile:{uid,discordId:user.id,displayName,photoURL},expires:Date.now()+60000});
return redirect(res,returnTo+'#discord_ticket='+ticket)}
if(req.method==='POST'&&url.pathname==='/auth/discord/exchange'){
if(!allowedOrigins.has(req.headers.origin))return json(res,403,{error:'Origem inválida'});
let body='';for await(const chunk of req){body+=chunk;if(body.length>2048)return json(res,413,{error:'Solicitação grande demais'})}
const {ticket}=JSON.parse(body),session=sessions.get(ticket);sessions.delete(ticket);if(!session||session.expires<Date.now())return json(res,400,{error:'Login expirado. Tente novamente.'});return json(res,200,{customToken:session.customToken,profile:session.profile})}
return json(res,404,{error:'Não encontrado'});
}catch{json(res,502,{error:'Não foi possível concluir o login. Confira a configuração do serviço e tente novamente.'})}
});
server.listen(Number(process.env.PORT)||4180,'127.0.0.1',()=>console.log('Login local do Tableverse: '+callback.origin));
