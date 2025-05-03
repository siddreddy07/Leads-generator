import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    date: {type: String, required: true},
    objectId: {type: String, required: true },
    type: {type: String, required: true},
    company: {type: String, required: true},
    name: {type: String, required: true},
    action: { type: String, required: true},
    status: { type: String, required: true},
    subscription: {type: String, required: true},
    broker: {type: String, required: true},
    postcode: {type: String, required: true},
  });

  const Lead = mongoose.model('Lead', leadSchema);

  export default Lead