(function () {

  angular.module('core', [
      'ipCookie'
    ])

    .run(function (sp, ipCookie, sp_api, $rootScope, user_service, tests_service, $timeout, refer_tags, refer_flag) {

      $rootScope.config = window._mtt_config || {};

      var _tags = [];

      // for fill profile action
      _tags.push(user_service.getTags().fill_profile);
      // for add info
      _tags.push(user_service.getTags().add_info);
      // for refer flag
      _tags.push(refer_flag);

      sp.send('init', {

        partner_id: $rootScope.config.partner_id || 1501,
        domain: $rootScope.config.domain || 'http://sailplay.ru',
        lang: 'ru'

      });

      $rootScope.loaded = false;

      $rootScope.auth = false;

      sp.on('init.success', function () {

        if (window.auth_hash) {

          sp.send('login', window.auth_hash);

        } else {

          authError();
          $rootScope.loaded = true;

        }

        $rootScope.$apply();

      });

      sp.on('login.error', function () {

        console.log('login error');

        authError();

        $rootScope.loaded = true;

        $rootScope.$apply();

      });

      sp.on('login.success', function () {

        $rootScope.loaded = true;

        $rootScope.auth = true;

        //load data for widgets
        sp_api.call('load.user.info', {all: 1});
        sp_api.call('load.actions.list');
        sp_api.call('load.user.history');
        sp_api.call('load.gifts.categories');
        sp_api.call('load.gifts.list', {verbose: 1});

        tests_service.loadData(function () {

          _tags = _tags.concat(refer_tags).concat(tests_service.getData().map(function (item) {
            return item.tag
          }));

          sp_api.call('tags.exist', {tags: _tags});

        });

        $rootScope.$apply();

      });

      sp.on('actions.perform.success', function (res) {

        sp_api.call('load.actions.list');

        $rootScope.$broadcast('notifier:notify', {

          header: 'Благодарим Вас',
          body: res && res.data && res.data.response && res.data.response.points ? 'На ваш счет начислено ' + res.data.response.points + ' бонусных баллов. Узнайте, на что вы можете их <a href="#" class="scrollToGifts">потратить</a>.' : 'На ваш счет начислены бонусные баллы. Узнайте, на что вы можете их <a href="#" class="scrollToGift">потратить</a>.'

        });

        sp_api.call('load.user.history');

        $rootScope.$apply();

      });

      sp.on('logout.success', function(){

        ipCookie('sailplay_vars', null);
        ipCookie('sailplay_form', null);

      });

      sp.on('actions.perform.error', function () {
        sp_api.call('load.actions.list');
      });

      sp.on('actions.perform.complete', function () {

        sp_api.call('load.user.info', {all: 1});

        sp_api.call('load.actions.list');

        sp_api.call('load.user.history');

      });

      sp.on('tags.add.success', function () {

        sp_api.call('load.user.info', {all: 1});

        $timeout(function () {

          sp_api.call('tags.exist', {tags: _tags});
          sp_api.call('load.user.history');

        }, 3000);


      });

      function authError() {

        $rootScope.$broadcast('notifier:notify', {

          header: 'Ошибка',
          body: 'Неверный auth_hash'

        });

      }


    });

}());
