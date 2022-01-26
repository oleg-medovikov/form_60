import pandas as pd
from sql import insert_org_emails


async def cheak_file(user_id:int,path: str, file_type: str) -> str:
    if file_type == 'org_emails':
        try:
            df = pd.read_excel(path,usecols=['email','Организация','Комментарий']) 
        except Exception as e:
            return str(e)
        else:
            await insert_org_emails(user_id,df)
            return 'Таблица org_email успешно обновлена'


