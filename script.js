/* ============================
BASE DE DATOS DE HORARIOS
============================ */

const schedule = [

{start:"07:10", end:"10:00", activity:"Rutina de Activación", focus:false},

{start:"10:00", end:"13:00", activity:"Tareas de Mantenimiento", focus:false},

{start:"13:00", end:"15:30", activity:"Bloque de Programación", focus:true},

{start:"15:30", end:"17:20", activity:"Refuerzo Académico", focus:true},

{start:"17:20", end:"18:20", activity:"Desconexión (Comida)", focus:false},

{start:"18:20", end:"19:30", activity:"Investigación Laboral", focus:true},

{start:"19:30", end:"20:30", activity:"Práctica de Piano", focus:false},

{start:"20:30", end:"21:30", activity:"Ocio (Gaming)", focus:false},

{start:"21:30", end:"22:30", activity:"Cierre y Descanso", focus:false}

]



/* ============================
RELOJ DIGITAL
============================ */

function updateClock(){

const now = new Date()

const h = String(now.getHours()).padStart(2,"0")
const m = String(now.getMinutes()).padStart(2,"0")
const s = String(now.getSeconds()).padStart(2,"0")

document.getElementById("clock").textContent = `${h}:${m}:${s}`

}

setInterval(updateClock,1000)



/* ============================
UTILIDAD PARA TIEMPO
============================ */

function timeToMinutes(t){

const parts = t.split(":")
return parseInt(parts[0])*60 + parseInt(parts[1])

}



/* ============================
ESTADO ACTUAL
============================ */

function updateStatus(){

const now = new Date()

const currentMinutes = now.getHours()*60 + now.getMinutes()

let currentActivity = "Fuera de horario"
let focus = false
let endTime = null
let next = null

schedule.forEach((block,i)=>{

const start = timeToMinutes(block.start)
const end = timeToMinutes(block.end)

if(currentMinutes >= start && currentMinutes < end){

currentActivity = block.activity
focus = block.focus
endTime = block.end

if(schedule[i+1]) next = schedule[i+1]

}

})


document.getElementById("current-status").textContent = currentActivity

const dot = document.getElementById("status-dot")

dot.style.backgroundColor = focus ? "#da3633" : "#238636"



/* tiempo restante */

if(endTime){

const endMin = timeToMinutes(endTime)

const remaining = endMin - currentMinutes

const h = Math.floor(remaining/60)
const m = remaining%60

document.getElementById("time-remaining").textContent =
`Tiempo restante: ${h}h ${m}m`

}else{

document.getElementById("time-remaining").textContent = ""

}



/* siguiente actividad */

if(next){

document.getElementById("next-activity").textContent =
`Siguiente: ${next.activity} (${next.start})`

}else{

document.getElementById("next-activity").textContent = ""

}

}

setInterval(updateStatus,1000)



/* ============================
GENERAR TABLA DE HORARIO
============================ */

function buildSchedule(){

const tbody = document.getElementById("schedule-body")

schedule.forEach(block=>{

const tr = document.createElement("tr")

const td1 = document.createElement("td")
td1.textContent = block.start

const td2 = document.createElement("td")
td2.textContent = block.activity

tr.appendChild(td1)
tr.appendChild(td2)

tbody.appendChild(tr)

})

}

buildSchedule()



/* ============================
PROGRESO DE METAS
============================ */

function updateProgress(){

const goals = document.querySelectorAll("#goals-list li")

let total = goals.length
let complete = 0

goals.forEach(goal=>{

if(goal.dataset.complete === "true") complete++

})

const percent = Math.round((complete/total)*100)

document.getElementById("progress-fill").style.width = percent+"%"

document.getElementById("progress-text").textContent =
`Progreso: ${percent}%`

}

updateProgress()



/* ============================
SEGURIDAD PANEL PRIVADO
============================ */

const password = "imthebest1331"

document.getElementById("secure-access").addEventListener("click",()=>{

const input = prompt("Introduce contraseña")

if(input === password){

const panel = document.getElementById("private-panel")

panel.classList.remove("hidden")

panel.classList.add("fade-in")

}else{

console.warn("Intento de acceso no autorizado")

}

})



/* ============================
TERMINAL JARVIS
============================ */

const terminal = document.getElementById("terminal")
const input = document.getElementById("terminal-input")

function print(text){

const line = document.createElement("div")
line.textContent = text

terminal.appendChild(line)

terminal.scrollTop = terminal.scrollHeight

}

print("JARVIS Terminal iniciado")
print("Escribe 'help' para comandos")



input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

const cmd = input.value.trim()

print("> "+cmd)

handleCommand(cmd)

input.value=""

}

})



function handleCommand(cmd){

switch(cmd){

case "help":

print("Comandos disponibles:")
print("status")
print("schedule")
print("goals")
print("clear")

break



case "status":

print("Estado actual: "+
document.getElementById("current-status").textContent)

break



case "schedule":

schedule.forEach(b=>{

print(`${b.start} - ${b.activity}`)

})

break



case "goals":

document.querySelectorAll("#goals-list li")
.forEach(g=> print(g.textContent))

break



case "clear":

terminal.innerHTML=""

break



default:

print("Comando desconocido")

}

}