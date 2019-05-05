const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://beatrizf13:beatrizf13@ds151486.mlab.com:51486/event-manager',
  {
    useNewUrlParser: true
  }
)
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise
