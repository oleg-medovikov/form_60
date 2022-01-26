from starlette.config import Config


config = Config('./.env')

DATABASE = 'sqlite:///db/db.db'

TELEGRAM_BOT_URL = config('TELEGRAM_BOT_URL', cast=str)
ID = config('MASTER_ID', cast=str)

KNOW_ID = [int(x) for x in ID.split(',')]
MASTER_ID = KNOW_ID[0]

GAME_SHORT_NAME = config('GAME_SHORT_NAME', cast=str)
GAME_URL = config('GAME_URL', cast=str )


