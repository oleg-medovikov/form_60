from dataclasses import dataclass

from config import groups, db


@dataclass
class User:
    user_id: int
    first_name: str
    second_name: str
    identificator: int

    async def find(id: int):
        query = groups.select(groups.c.user_id == id)
        res = await db.fetch_one(query)
        if res is None:
            return False
        return res

    async def create(self, user) -> bool:
        found = await self.find(user.user_id)
        if found:
            return False
        query = user.insert().values(**user)
        await db.execute(query)
        return True

    async def update(self, user):
        found = await self.find(user.user_id)
        if not found:
            return False
        # update
        return True

    async def delete(self, id):
        found = await self.find(id)
        if not found:
            return False
        # delete
        return True
