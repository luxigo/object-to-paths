module.exports={
  objectToPaths: objectToPaths,
  dump: dump
}
  
function objectToPaths(data) {
    var validId = /^[a-z_$][a-z0-9_$]*$/i;
    var result = [];
    var seen = [];
    doIt(data, "");
    return result;

  function doIt(data, s) {
    if (data && typeof data === "object") {
      if (seen.indexOf(data)>=0) {
        result.push(s + ': [circular]');

      } else {
        seen.push(data);
        if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            doIt(data[i], s + "[" + i + "]");
          }

        } else {
          for (var p in data) {
            if (validId.test(p)) {
              doIt(data[p], s + ((s.length) ? "."+p : p));
            } else {
              doIt(data[p], s + "[\"" + p + "\"]");
            }
          }
        }
      }

    } else {
      result.push(s + ': ' + data);
    }
  }
}

function dump(data) {
  console.log(objectToPaths(data).join('\n'));
}

