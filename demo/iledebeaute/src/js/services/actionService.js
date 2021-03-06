(function (angular, sp) {

  angular.module('iledebeaute.services.actions', ['iledebeaute.services.data'])

    .service('actionService', ['dataService', function (dataService) {

      var self = this;

      var TAGS = {
        profile: dataService.tags.profile
      };

      var cssLink = dataService.actionCss;

      self.loadList = function () {
        self.actions = [];
        return new Promise(function (resolve, reject) {
          sp.on('load.actions.list.success', function (data) {
            self.actions = data.actions.filter(function (item) {
              return item.socialType;
            });
            self.sending = false;
            resolve(angular.extend([], self.actions));
          });
          if (!self.sending) {
            sp.send('load.actions.list');
          }
          self.sending = true;

        });
      };

      self.getTitle = function (action) {
        if (!action) return 'Нет описания';
        var obj = {
          like: 'Вступить в группу ',
          partner_page: 'Рассказать о нас друзьям в '
        };
        var socObj = {
          fb: 'Facebook',
          ok: 'Одноклассниках',
          vk: 'Вконтакте',
          tw: 'Twitter',
          gp: 'Google +',
        };
        var result = (obj[action.action] ? obj[action.action] : '') + (socObj[action.socialType] ? socObj[action.socialType] : '');
        return result || 'Нет описания';
      };

      self.getIcon = function (action) {
        if (!action) return '';
        var classNames = {
          fb: 'sir_fb',
          vk: 'sir_vk',
          ok: 'sir_ok',
          tw: 'sir_tw',
          gp: 'sir_gp'
        };
        var obj = {
          partner_page: classNames,
          like: classNames,
          purchase: classNames
        };
        if (action.socialType && obj[action.action] && obj[action.action][action.socialType]) {
          return obj[action.action][action.socialType];
        } else {
          return '';
        }
      };

      self.getList = function () {
        if (self.actions) {
          return new Promise(function (resolve, reject) {
            resolve(angular.extend([], self.actions));
          });
        } else {
          return self.loadList();
        }
      };

      self.getTags = function () {
        return TAGS;
      };

      self.getActionsCssLink = function () {
        return cssLink;
      };

    }]);

}(window.angular, window.SAILPLAY));