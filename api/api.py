from fastapi import FastAPI, Request

import uvicorn
from multiprocessing import Process

from clas   import pch, user

app = FastAPI(title="form_60_API")


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://медовиков.рф:8080",
    "https://localhost:8080",
    "https://xn--b1aaedrmjsd.xn--p1ai:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


"""
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

#app.mount("/form", StaticFiles(directory="web", html=True ), name="form")

templates = Jinja2Templates(directory="web")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    data = {
        "identificator": 242342,
        "username" : "Oleg Medovikov"
    }
    return templates.TemplateResponse("dist/index.html", {"request": request, "data": data})
"""

@app.get('/users/{ID}')
async def find_user(ID):
    USER = await user.find_user(int(ID))
    if USER == 0:
        return {"user not found"}
    else:
        return USER

@app.get('/snils/{SNILS},{IDENTIFICATOR}')
async def create_pachient(SNILS,IDENTIFICATOR):
    # Ищем пациента по снилс
    PACHIENT = await pch.find_pachient(ID,SNILS)

    if PACHIENT == 0:
        return {}
    else:
        return PACHIENT


def api_run():
    uvicorn.run("api.api:app",
            host="0.0.0.0",port=8443,
            reload=True,workers =2, 
            ssl_keyfile='api/oleg.key', 
            ssl_certfile='api/oleg.crt',)

def web_form():
    proc = Process(target=api_run, args=(), daemon=False)
    proc.start()
