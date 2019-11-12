const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
<<<<<<< HEAD

=======
>>>>>>> e97f2fc9dcf7b68fe4c4f449bff360521b1ea01f
    var filepath = path.join(exports.dataDir, `${id}.txt`);

    fs.writeFile(filepath, text, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {id, text});
<<<<<<< HEAD
=======

>>>>>>> e97f2fc9dcf7b68fe4c4f449bff360521b1ea01f
      }
    });
  });
};

// exports.readAll = (callback) => {
//   var data = _.map(items, (text, id) => {
//     return { id, text };
//   });
//   callback(null, data);
// };

exports.readAll = (callback) => {
<<<<<<< HEAD
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  var array = [];
  fs.readdir(exports.dataDir, (err, datafiles) => {
    if (err) {
      console.log(err);
    } else {

      var data = datafiles.map((datafile) => {
        var id = path.basename(datafile, '.txt');
        return fs.readFile(path.join(exports.dataDir, datafile), (error, filetext) => {
          return {id: id, text: filetext};
        })
      })
    }
  }
=======

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log(err);
    }
    var data = _.map(files, (file) => {
      var id = path.basename(file, '.txt');
      return {id: id, text: id};
    });
    callback(null, data);
  });
>>>>>>> e97f2fc9dcf7b68fe4c4f449bff360521b1ea01f
};
  // callback(null, data);


exports.readOne = (id, callback) => {
  var filepath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile(filepath, (err, text) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {id, text: text.toString()});
    }
  });
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  var filepath = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(filepath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      });
    }
  });

};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  var filepath = path.join(exports.dataDir, `${id}.txt`);
  fs.unlink(filepath, (err) => {
    callback(err);
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};