from .config import DATABASE
import sqlalchemy, asyncio
import datetime

from databases import Database
from sqlalchemy import create_engine, MetaData, Column, Table, Integer, String, Date

db       = Database(DATABASE)
metadata = MetaData()
engine   = create_engine(DATABASE)

org_email = Table(
        'org_email',
        metadata,
        Column("email", String),
        Column("organization", String),
        Column("comment", String),
        Column("identificator", Integer)
        )
groups = Table(
        'groups',
        metadata,
        Column("user_id", Integer),
        Column("first_name", String),
        Column("second_name", String),
        Column("identificator", Integer)
        )
pachient = Table(
        'pachient',
        metadata,
        Column("id", Integer, primary_key=True, \
                autoincrement=True, unique=True), # уникальный номер пациента
        Column("type", Integer),  # 0 - контактный, 1 - пациент 
        Column("unrz",  Integer), # УНРЗ
        Column("date",  Date),    # Дата создания записи
        Column("cnils", String),  # СНИЛС
        Column("polic", String),  # ПОЛИС
        Column("fio",   String),  # ФИО
        Column("epid",  String),  # ЭПИД НОМЕР
        Column("epid_type", Integer), # тип эпид номера
        # 0 - (Зелёные) с ковидом без эпида или эпидномеприсвоен
        # 1 - (Жёлтые) с ковидом и эпид присвоен нами
        # 2 - (Красные) вакцинированные
        Column("birthday", Date), # Дата рождения
        Column("pasport",  String), # Паспортные данные
        Column("adress", String),   # Адрес проживания
        Column("Comment", String),  # Коментарий
        Column("Start_observation", Date), # Дата начала наблюдения
        Column("End_observation", Date),   # Дата окончания наблюдения
        Column("telefon", String),  # Телефон
        Column("doctor", String),   # врач
        Column("work", String),     # место работы
        Column("Start_ill", Date),  # дата начала заболевания
        Column("Start_petition", Date), # дата обращения
        Column("identificator", Integer) # идентификатор группы
        )
laboratory = Table(
        'laboratory',
        metadata,
        Column("pachient_id", Integer), # Уникальный идентификатор пациента 
        Column("fio", String),  # ФИО
        Column("test_number", Integer), # Порядковый номер исследования  
        Column("laboratory", String), # Наименование лаборатории 
        Column("date_intake", Date),  # дата забора 
        Column("date_result", Date),  # дата результата
        Column("result", Integer), # 1-положительный или 0 - отрицательный 2 - брак
        Column("identificator", Integer) # идентификатор группы
        )
event = Table(
        'event',
        metadata,
        Column("pachient_id", Integer), # Уникальный идентификатор пациента 
        Column("fio", String),  # ФИО
        Column("date", Date), # Дата события
        Column("text", String), # Описание события
        Column("identificator", Integer), # идентификатор группы
        )
metadata.create_all(bind=engine)


async def DB_QUERY(sql):
    await db.connect()
    return await db.fetch_all(query=sql)

async def DB_EXECUTE(sql):
    await db.connect()
    return await db.execute(query=sql)

