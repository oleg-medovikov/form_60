from dataclasses import dataclass
import datetime
from config import DB_QUERY, DB_EXECUTE

@dataclass
class pachient:
    id : int
    type : int
    unrz : int
    date : datetime.date
    snils : str
    polis : str
    fio   : str
    epid : str
    epid_type : str
    birthday : datetime.date
    passport : str
    adress : str
    comment : str
    start_observation : datetime.date
    end_observation : datetime.date
    telefon : str
    doctor : str
    work : str
    start_ill : datetime.date
    start_petition : datetime.date
    identificator : int

    async def find_pachient(identificator:int, snils):
        sql = f"""SELECT id,type,unrz,date,snils,polis,
                        fio,epid,epid_type,birthday,
                        passport,adress,comment,
                        start_observation,end_observation,
                        telefon,doctor,work,start_ill,
                        start_petition,identificator
                            from pachient
                                where identificator = {identificator}
                                    and snils = '{snils}'"""
        res = await DB_QUERY(sql)
        if len(res) == 0:
            return 0
        else:
            row = res[0]
            return pachient(*row)
    
    async def save_pachient(pachient) -> bool:
        cheak = await find_pachient(pachient.identificator, pachient.snils)
        if not cheak == 0:
            return 0
        else:
            sql = f"""insert into pachient 
                        (type,unrz,date,snils,polis,
                        fio,epid,epid_type,birthday,
                        passport,adress,comment,
                        start_observation,end_observation,
                        telefon,doctor,work,start_ill,
                        start_petition,identificator)
                            values
                            ({pachient.type},{pachient.unrz},
                            '{pachient.date}','{pachient.snils}','{pachient.polis}',
                            '{pachient.fio}','{pachient.epid}',{pachient.epid_type},
                            '{pachient.birthday}','{pachient.passport}',
                            '{pachient.adress}','{pachient.comment}',
                            '{pachient.start_observation}','{pachient.end_observation}',
                            '{pachient.telefon}','{pachient.doctor}','{pachient.work}',
                            '{pachient.start_ill}','{start_petition}',
                            '{pachient.identificator}' 
                            )"""
            try:
                await DB_EXECUTE(sql)
            except Exception as e:
                print(e)
                return 0
            else:
                return 1


