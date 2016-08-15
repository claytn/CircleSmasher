import Realm from 'realm';

var HighScores = {
  name: 'HighScores',
  properties:{
    score: 'int'
  }
};

let realm = new Realm({schema:[HighScores], schemaVersion: 1});
realm.write(()=>{
  //realm.delete(realm.objects('HighScores'));
  realm.create('HighScores',{score: 0});
  realm.create('HighScores',{score: 0});
  realm.create('HighScores',{score: 0});
});

export default realm;
