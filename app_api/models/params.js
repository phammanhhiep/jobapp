/*
ParamSchema
- Contain all parameters and mapping needed to interpret encoded values.
- Being loaded when server is started running.

*/

var mongoose = require ('mongoose');

var ParamSchema = mongoose.Schema ({
	bizCategories: [{name: String, code: Number}],
});

mongoose.model ('Params', ParamSchema);