from .get_identificator import get_identificator
from .write_styling_excel_file  import write_styling_excel_file
from config import engine
import pandas as pd 


async def select_pachient(user_id:int) -> str:
    "Возращает путь к файлу пациентов"
    sql=f""" select unrz as 'УНРЗ',
                    date as 'Дата занесения',
                    cnils as 'СНИЛС',
                    polic as 'ПОЛИС',
                    fio   as 'ФИО',
                    epid  as 'ЭПИД',
                    epid_type,
                    birthday as 'Дата рождения',
                    pasport as 'Номер паспорта',
                    adress as 'Адрес проживания',
                    Start_observation as 'Дата начала наблюдения',
                    End_observation as 'Дата окончания наблюдения',
                    telefon as 'телефон',
                    doctor as 'врач',
                    work as 'Место работы',
                    Start_ill as 'Дата начала заболевания',
                    Start_petition as 'Дата обращения'
                    from pachient
                    where
                    type = 1
                    and identificator = {await get_identificator(user_id)}
    """
    df = pd.read_sql(sql,engine)
    write_styling_excel_file('temp/pachients.xlsx', df, 'пациенты')
    return 'temp/pachients.xlsx'
