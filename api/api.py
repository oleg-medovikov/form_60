from fastapi import FastAPI
import uvicorn
from multiprocessing import Process

from clas   import pch, user

app = FastAPI(title="form_60_API")


@app.get('/user/{ID}')
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
    if res == 0:
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
