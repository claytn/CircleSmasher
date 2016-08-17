import Realm from 'realm';

var HighScores = {
  name: 'HighScores',
  properties:{
    score: 'int'
  }
};

var Sound = {
  name: 'Sound',
  properties:{
    sound:{type:'bool', default: true}
  }
};

let realm = new Realm({schema:[HighScores,Sound], schemaVersion: 2});
realm.write(()=>{
  
  realm.create('Sound',{sound: true});
  realm.create('HighScores',{score: 0});
});

export default realm;
