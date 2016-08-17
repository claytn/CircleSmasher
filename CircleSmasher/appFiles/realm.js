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

var Unlocked = {
  name: 'Unlocked',
  properties:{
    circles: {type: 'bool', default: true},
    emojis: {type: 'bool', default: false},
    sports: {type: 'bool', default: false}
  }
}

var SelectedPack = {
  name: 'SelectedPack',
  properties:{
    pack: {type: 'string', default: 'circles'}
  }
}

var GamesPlayed = {
  name: 'GamesPlayed',
  properties:{
    count: {type: 'int', default: 0}
  }
}

let realm = new Realm({schema:[HighScores,Sound, SelectedPack, Unlocked, GamesPlayed], schemaVersion: 3});
realm.write(()=>{
  realm.delete(realm.objects('GamesPlayed'));
  realm.delete(realm.objects('HighScores'));
  realm.delete(realm.objects('Sound'));
  realm.delete(realm.objects('SelectedPack'));
  realm.delete(realm.objects('Unlocked'));
  realm.create('GamesPlayed', {count: 0});
  realm.create('Unlocked', {circles: true, emojis: false, sports: false});
  realm.create('Sound',{sound: false});
  realm.create('HighScores',{score: 0});
  realm.create('SelectedPack',{pack: 'circles'});
});

export default realm;
