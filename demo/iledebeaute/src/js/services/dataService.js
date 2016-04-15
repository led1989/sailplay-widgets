(function (angular, sp) {

  angular.module('iledebeaute.services.data', [])

    .service('dataService', function () {

      var self = this;

      self.menu = [
        {
          label: 'О программе',
          key: 'about',
          // DEFAULT ACTIVE ELEMENT
          active: true
        },
        {
          label: 'Условия участия',
          key: 'rules',
          items: [
            {
              label: 'Правила начисления бонусов',
              key: 'rules'
            },
            {
              label: 'Правила списания бонусов',
              key: 'cut_bonus_rules'
            },
            {
              label: 'Полезная информация',
              key: 'info'
            }
          ]
        },
        {
          label: 'История начислений',
          key: 'history',
          items: [
            {
              label: 'История начислений',
              key: 'history'
            },
            {
              label: 'Получи больше бонусов',
              key: 'actions'
            }
          ]
        },
        {
          label: 'Сокровищница привилегий',
          key: 'gifts',
          items: [
            {
              label: 'Сокровищница привилегий',
              key: 'gifts'
            },
            {
              label: 'Архив привилегий',
              hide: true,
              key: 'gifts_archive'
            }
          ]
        },
        {
          label: 'Вопрос-ответ',
          key: 'faq',
          items: [
            {
              label: 'Часто задаваемые вопросы',
              key: 'faq'
            },
            {
              label: 'Форма обратной связи',
              hide: true,
              key: 'feedback'
            }
          ]
        }
      ];

      self.pages = {
        cut_bonus_rules: {
          title: 'Правила списания бонусов',
          text: 'Бонусы могут быть списаны на любые привилегии из списка в блоке “Привилегии”. Обратите внимание - количество некоторых, особенно ценных, привилегий очень ограничено, поэтому их необходимо бронировать заранее. Накопив достаточно бонусов на получение привилегии, выберите её в соответствующем разделе и получите электронное письмо с сертификатом на эту привилегию. Для вашего удобства, при необходимости - вы можете связаться с менеджером и договориться об индивидуальном процессе получения привилегии.'
        },
        rules: {
          title: 'Правила начисления бонусов',
          text: 'Совершайте покупки в розничных салонах и интернет-магазине Иль де Ботэ и получайте бонусы в зависимости от состава покупки. \n\nБонусы могут быть списаны на любые привилегии из списка в блоке “Привилегии”. Обратите внимание - количество некоторых,\n\nПолучите 1 бонус за каждую 1000 рублей в чеке, но за некоторые товары бонусы могут начисляться с повышенным коэффициентом.\n\nособенно ценных, привилегий очень ограничено, поэтому их необходимо бронировать заранее. Накопив достаточно бонусов на \n\nПолучайте бонусы по специальным предложениям, например, проходя интервью или приглашая своих друзей к участию в программе.'
        },
        info: {
          title: 'Полезная информация',
          text: 'Полезная информация текст'
        },
        about: {
          title: 'О программе',
          text: 'О программе текст'
        }
      };

      self.tests = [
        {
          name: 'Пройти опрос',
          points: 300,
          tag: 'Прошел опрос',
          data: [
            {
              q: 'Подскажите, пожалуйста, как часто Вы пользуетесь услугами Кабины красоты и прокомментируйте ваш ответ:',
              a: [
                {
                  text: 'не пользуюсь, услуга не заинтересовала',
                  tag: 'test'
                }, {
                  text: 'иногда, если есть время',
                  tag: 'test'
                }, {
                  text: 'всегда, если покупка соответствует условиям для записи в Кабину красоты',
                  tag: 'test'
                }, {
                  text: 'раньше посещала, не понравилось, больше не хожу',
                  tag: 'test',
                  yourAnswer: 'varName'
                }
              ]
            },
            {
              q: 'Пожалуйста, выберете выражение, которое Вам ближе всего:\nДля меня Кабина красоты в ИЛЬ ДЕ БОТЭ - это',
              a: [
                {
                  text: 'возможность получить консультацию косметолога по побору средств марки именно для моей кожи',
                  tag: 'test'
                },  {
                  text: 'знакомство и тестирование продуктов  новой марки или новых товаров в сети',
                  tag: 'test'
                },  {
                  text: 'наглядное руководство по способу использования товаров марки',
                  tag: 'test'
                },  {
                  text: 'приятный комплимент от сети, так как предоставляют дополнительный сервис по уходу',
                  tag: 'test'
                }
              ]
            },
            {
              q: 'Подскажите, пожалуйста, совершали ли Вы покупку  продукции марки, которая использовалась в Кабине Красоты?',
              a: [
                {
                  text: 'да, заинтересовал продукт, приобрела в тот же день, через некоторое время',
                  tag: 'test'
                },  {
                  text: 'нет, не было необходимости',
                  tag: 'test'
                }
              ]
            }
          ]
        }
      ];

      self.faq = [
        {
          q: 'Мне не удается зарегистрироваться , т.к. я не помню, какие именно данные указывала в анкете при получении дисконтной карты в магазине ИЛЬ ДЕ БОТЭ. Что делать?',
          a: '<br>1. При совершении любой покупки в магазине парфюмерии и косметики ИЛЬ ДЕ БОТЭ Вы можете обратиться на кассу с просьбой поменять Ваши данные по Вашей карте, предъявив документ удостоверяющий личность.<br>\n2. Если Вы недавно совершили покупку с помощью Вашей дисконтной карты клиента в магазине парфюмерии и косметики ИЛЬ ДЕ БОТЭ и у Вас остался чек, Вы можете позвонить на Горячую Линию ИЛЬ ДЕ БОТЭ и оставить заявку на изменение данных по Вашей карте. При этом необходимо будет назвать информацию, содержащуюся в чеке и верные данные для замены. После обработки Ваш запрос будет передан в Службу поддержки. В случае положительного решения по Вашему запросу, Вам будет выслано подтверждение об изменении данных по электронной почте, либо сообщено по телефону.\n'
        },
        {
          q: 'Я потеряла карту клиента и получила в магазине ИЛЬ ДЕ БОТЭ новую. Но номера старой утерянной карты и новой не совпадают. Как быть, ведь у меня уже есть накопленные бонусы, в котором указан номер старой карты? Не пропадут ли уже накопленные мной бонусы?\n',
          a: 'В случае замены дисконтной карты Клиента магазинов парфюмерии и косметики ИЛЬ ДЕ БОТЭ на новую, бонусы, накопленные по предыдущей карте, могут быть сохранены при условии сообщения Вами данных о новой карте в службу поддержки клиентов.\n'
        },
        {
          q: 'В каталоге подарков я выбрала _________. Я живу в _______. Как и когда я смогу его получить?',
          a: 'Выбранный Вами подарок будет отправлен в магазин парфюмерии и косметики ИЛЬ ДЕ БОТЭ в г.________. Как только он будет доставлен в магазин, с вами свяжутся. Срок доставки подарков – до __ месяцев с момента оформления запроса на их получение на сайте.\n'
        },
        {
          q: 'Как мне накопить бонусы быстрее на желанный приз?',
          a: 'Вы можете узнать об этом в разделе «заработать доп.бонусы»'
        },
        {
          q: 'Сколько времени действуют накопленные бонусы?',
          a: 'Вы можете копить бонусы до _______, после этого они сгорают.'
        },
        {
          q: 'Не начислили бонусы (начислили неверно). Что делать?',
          a: ''
        },
        {
          q: 'Мне не дали бонусов, т.к. я забыл предъявить карту на кассе. Что делать?',
          a: ''
        },
        {
          q: 'Как мне заказать приз за бонусы?',
          a: ''
        },
        {
          q: 'Как я могу забрать приз? Может ли кто-то забрать за меня мой приз?',
          a: ''
        },
        {
          q: 'Как мне подписаться или изменить подписку на рассылки?',
          a: ''
        }
      ];

      self.tags = {
        profile: 'Заполнил профиль'
      };

      self.actionCss = 'http://iledebeaute.dev4you.info/css/btn_styles.css';

      return self;

    });

}(window.angular, window.SAILPLAY));