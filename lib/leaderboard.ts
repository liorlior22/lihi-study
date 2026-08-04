import { cookies } from "next/headers";

export type Leader = { display_name:string; best_score:number; total_attempts:number; best_average_time_ms:number; achieved_at:string };
export type Standing=Leader&{position:number};
const COOKIE="lihi_leaderboard_name";
export async function playerName(){const value=(await cookies()).get(COOKIE)?.value;return value?decodeURIComponent(value):null}
export async function setPlayerName(name:string){(await cookies()).set(COOKIE,encodeURIComponent(name),{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*30})}
function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error("Supabase is not configured");return{url:url.replace(/\/$/,""),key:key.trim()}}
async function request(path:string,init?:RequestInit){const{url,key}=config();const headers:Record<string,string>={apikey:key,"Content-Type":"application/json",Prefer:"return=representation"};if(!key.startsWith("sb_secret_"))headers.Authorization=`Bearer ${key}`;const response=await fetch(`${url}/rest/v1/${path}`,{...init,headers:{...headers,...init?.headers},cache:"no-store"});if(!response.ok){const detail=await response.text();console.error("Supabase REST error",response.status,detail);throw new Error(`Database request failed: ${response.status}`)}return response.json()}
export async function top10():Promise<Leader[]>{return request("leaderboard_top10?select=*&limit=10")}
export async function standing(name:string):Promise<Standing|null>{const rows:Leader[]=await request("leaderboard_all?select=*&order=best_score.desc,best_average_time_ms.asc,achieved_at.asc");const index=rows.findIndex(row=>row.display_name===name);return index<0?null:{...rows[index],position:index+1}}
export async function recordAttempt(input:{display_name:string;score:number;total_time_ms:number;average_time_ms:number;failed_question_id:string}){await request("rpc/record_streak_attempt",{method:"POST",body:JSON.stringify({p_display_name:input.display_name,p_score:input.score,p_total_time_ms:input.total_time_ms,p_average_time_ms:input.average_time_ms,p_failed_question_id:input.failed_question_id})});return standing(input.display_name)}
export function databaseReady(){return Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY)}
