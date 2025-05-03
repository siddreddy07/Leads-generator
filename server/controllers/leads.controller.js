import Lead from "../models/leads.model.js";



const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

export const getallLeads =  async (req, res) => {
    try {
        const leads = await Lead.find();
        const formattedLeads = leads.map(lead => ({
          _id: lead._id,
          date: formatDate(lead.date),
          objectId: lead.objectId,
          type: lead.type,
          company: lead.company,
          name: lead.name,
          action: formatDate(lead.action),
          status: lead.status,
          subscription: lead.subscription,
          broker: lead.broker,
          postcode: lead.postcode,
        }));
        res.status(200).json(formattedLeads);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching leads' });
      }
  };  


export const addLead = async(req,res)=>{

    try {
        const leadsData = req.body;
        if (!Array.isArray(leadsData)) {
          return res.status(400).json({ error: 'Request body must be an array of leads' });
        }
    
        const insertedLeads = await Lead.insertMany(leadsData);
        res.status(201).json({ message: 'Leads added successfully', insertedLeads });
      } catch (error) {
        res.status(500).json({ error: 'Error adding leads', details: error.message });
      }

}