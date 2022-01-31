from dataclasses import dataclass

from config import  groups, db

@dataclass
class user:
    user_id : int
    first_name : str
    second_name : str
    identificator : int

    async def find_user(id:int):
        query = groups.select().where(groups.c.user_id==id)
        user = await db.fetch_one(query)
        if user is None:
            return 0
        else:
            return user

    async def save_user(user) -> bool:
        cheak = await find_user(user.user_id)
        if not cheak == 0:
            return 0
        else:
            query = user.insert().values(**user)
            await db.execute(query)
            return 1

