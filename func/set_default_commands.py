from aiogram.types import BotCommand

async def set_default_commands(dp):
    commands = [
        BotCommand(command="start",
            description="Получить подсказку по командам"),
        BotCommand(command="org_emails",
            description="Получить файл с контактами организаций"),
        BotCommand(command="email",
            description="Найти email МО по части названия"),
        BotCommand(command="current_id",
            description="Посмотреть текущий идентификатор группы"),
        BotCommand(command="change_id",
            description="Сменить свой идентификатор группы"),
        BotCommand(command="all_pachients",
            description="Возвращает файл со всеми пациентами"),
    ]
    await dp.bot.set_my_commands(commands)


