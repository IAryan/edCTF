import Ember from 'ember';

export default Ember.Component.extend({
  challenge: {},
  modal: {},
  flag: '',
  classNames: ['challenge-submit', 'challenge-cancel'],
  setupKeys: function() {
    Ember.$('body').on('keyup.modal-dialog', (e) => {
      if (e.keyCode === 27) {
        this.set('modal.isChallenge', false);
      }
    });
  }.on('didInsertElement'),
  teardownKeys: function() {
    Ember.$('body').off('keyup.modal-dialog');
  }.on('willDestroyElement'),
  setupFocus: function() {
    Ember.$('#inputFlag').focus()
  }.on('didInsertElement'),
  actions: {
    closeChallengeModal: function() {
      this.set('modal.isChallenge', false);
    },
    submitFlag: function() {
      console.log('Flag was submitted with value: ', this.get('flag'));
      this.set('flag', '');
    },
  }
});

