from config import DB_EXECUTE
from .get_identificator import get_identificator

async def change_identificator(user_id:int, identificator:int) -> str:
    current_ident = await get_identificator(user_id)
    if current_ident == identificator:
        return "Я ничего не изменил, так как это и так ваш ID"
    else:
        sql = f"update groups set identificator = {identificator} where user_id = {user_id}"
        await DB_EXECUTE(sql)
        return "Я изменил ваш ID"
