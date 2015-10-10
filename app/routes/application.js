import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, model){
    controller.set('authController', this.controllerFor('auth'));
    controller.set('modal', this.controllerFor('modal').get('modal'));
  },
});
