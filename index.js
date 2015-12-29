module.exports={
  objectToPaths: objectToPaths,
  dump: dump
}
  
function objectToPaths(data, options) {
  var options=options||{};
  var validId = /^[a-z_$][a-z0-9_$]*$/i;
  var result = [];
  var seen = [];
  var seen_path = [];
  doIt(data, "");
  return result;

  function doIt(data, s) {
    if (data) {
      switch(typeof data) {
      case 'object':
        var index=seen.indexOf(data);
        if (index>=0) {
          result.push(s + ': [circular: '+seen_path[index]+']');

        } else {
          seen.push(data);
          seen_path.push(s);
          if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
              doIt(data[i], s + "[" + i + "]");
            }

          } else {
            for (var p in data) {
              if (!data.hasOwnProperty || data.hasOwnProperty(p)) {
                if (validId.test(p)) {
                  doIt(data[p], s + ((s.length) ? "."+p : p));
                } else {
                  doIt(data[p], s + "[\"" + p + "\"]");
                }
              }
            }
          }
        }
        break;

      case 'function':
        result.push(s + ': ' + ((options.functions)?data:'[function]'));
        break;

      default:
        result.push(s + ': ' + data);
        break;

      }

    } else {
      result.push(s + ': ' + data);
    }
  }
}

function dump(data) {
  console.log(objectToPaths(data).join('\n'));
}

