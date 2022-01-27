import pandas as pd 
from config import engine
from .get_identificator import get_identificator

async def select_one_org_email(user_id:int, search:str) -> str:
    sql = f"""select email, organization
                from org_email 
                where identificator = {await get_identificator(user)}
                and (organization like '%{search}%'
                or comment like '%{search}%')
                """
    df = pd.read_sql(sql,engine)
    if len(df) == 0:
        string = "Не найдено подходящей организации"
    elif len(df) == 1 and not pd.isnull(df.at[0,"email"]):
        string = "У организации " + df.at[0,"organization"] +' найден email\n' + df.at[0,"email"]
    elif len(df) == 1 and pd.isnull(df.at[0,"email"]):
        string = "У организации " + df.at[0,"organization"] +' пустой email'
    elif len(df) < 4 :
        string = "Найдено несколько организаций:"
        for i in range(len(df)):
            string += "\n" + df.at[i,"organization"] +"  ->  " + str(df.at[0,"email"] or "Пустая строка")
    else:
        string = "Найдено слишком много организаций, уточните поиск"

    return string

