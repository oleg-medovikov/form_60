"""
Этот бот написан для удобства заполнения формы 60 для врачей
Автор Медовиков Олег
2022
"""
import logging, threading
from uuid import uuid4
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import InlineQueryResultGame

from config import  TELEGRAM_BOT_URL, GAME_SHORT_NAME, GAME_URL
from func   import *
from sql    import *
from web    import *

logging.basicConfig(level=logging.INFO)

bot = Bot(token=TELEGRAM_BOT_URL)
dp  = Dispatcher(bot)

async def on_startup(dp):
    await set_default_commands(dp)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    user = message['from']
    await message.answer(hello_message(user), parse_mode='html')
##==================список контактов ====================
@dp.message_handler(commands=['org_emails'])
async def send_file_org_emails(message: types.Message):
    user = message['from']
    await message.answer_document(open(await select_org_emails(user), 'rb'))

@dp.message_handler(commands=['email'])
async def send_email_by_org(message: types.Message):
    arg = message.get_args()
    if arg == '':
        await message.reply('Добавьте к команде слово для поиска')
    else:
        res = await select_one_org_email(message['from'].id, arg) 
        await message.answer(res)
##=================работа с груповым идентификатором==============
@dp.message_handler(commands=['current_id'])
async def view_current_identificator(message: types.Message):
    user = message['from']
    await message.answer(await get_identificator(user))

@dp.message_handler(commands=['change_id'])
async def change_carent_identificator(message: types.Message):
    arg = message.get_args()
    user = message['from']
    if arg == '':
        await message.reply('Добавьте к команде число - значение идентификатора')
    else:
        try:
            identificator = int(arg)
        except:
            await message.reply('Я так решил, что идентификатор должен быть целым числом, попробуйте ещё раз')
        else:
            await message.answer(await change_identificator(user, identificator))

##===============список поциентов==========================
@dp.message_handler(commands=['all_pachients'])
async def send_file_pachient(message: types.Message):
    user = message['from']
    await message.answer_document(open(await select_pachient(user), 'rb'))
##===========загрузка файлов ===============================    

@dp.message_handler(content_types=['document'])
async def get_file_message(message):
    file = message['document']
    if 'org_emails' in file.file_name:
        DESTINATION = 'temp/'+file.file_unique_id + '.xlsx'
        await bot.download_file_by_id(
                file_id=file.file_id,
                destination=DESTINATION
                )
        RES = await cheak_file(message['from'].id,DESTINATION,'org_emails' )
        await message.answer(RES)
##==============Запуск формы ================
my_game = lambda callback_query: \
    callback_query.game_short_name == GAME_SHORT_NAME

#=============заходим в форму=================
@dp.callback_query_handler(my_game)
async def send_welcome(callback_query: types.CallbackQuery):
    user_id = callback_query['from'].id
    callback_id = callback_query['id']

    await bot.answer_callback_query(
            callback_query.id, 
            url=GAME_URL + f'?id={user_id}')

#====создаём приглашение в форму в чате=============
@dp.inline_handler()
async def send_game(inline_query: types.InlineQuery):
    user_uuid = str(uuid4())
    await bot.answer_inline_query(
            inline_query.id,
            [InlineQueryResultGame(id=user_uuid, game_short_name=GAME_SHORT_NAME)])

async def drop_table(table):
    sql = f"drop table {table}"
    await DB_EXECUTE(sql)

if __name__ == '__main__':
    #drop_table('pachient')
    t=threading.Thread(target=web_form, name="web_form")
    t.start()
    executor.start_polling(
            dp,
            on_startup=on_startup)


