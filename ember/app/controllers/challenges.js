import Ember from 'ember';

export default Ember.Controller.extend({
  modal: {},
  ctf: null,
  user: {},
  sortCategory: ['name:asc'],
  sortChallenges: ['points:asc', 'id'],
  sortedChallengeboard: {},
  categories: {},
  setSolvedChallenges: function(){
    // Add new challenge to solved if it exists
    var chall_id = this.get('modal.solvedChallenge');
    if (chall_id || chall_id === 0){
      var challenge = this.store.peekRecord('challenge', chall_id);
      if (challenge){
        var points = this.get('user.team.points');
        if (points) {
          this.set('user.team.points', points+challenge.get('points'));
        }
      }
      
      var usersolved = this.get('user.team.solved');
      if (usersolved){
        usersolved.addObject(chall_id);
      }
      this.set('modal.solvedChallenge', false);
    }

    // Updated isSolved flag for challenges that are solved
    var solved = this.get('user.team.solved');
    var t = this;
    if(solved){
      solved.forEach(function(challenge_id){
        var challenge = t.store.peekRecord('challenge', challenge_id);
        if (challenge){
          if(!challenge.get('isSolved')){
            challenge.set('isSolved', true);
          }
        }
      });
    } // TODO: set challenges isSolved back to false on logout
  }.observes('ctf.challengeboard.categories', 'user', 'modal.solvedChallenge'),
  actions: {
    openLoginModal: function() {
      this.set('modal.isLogin', true);
    },
    openChallenge: function(id) {
      this.store.find('challenge', id).then((challenge) => {
        this.set('modal.challenge', challenge);
      });
      this.set('modal.isChallenge', true);
    },
  }
});