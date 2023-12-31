const express = require('express')
const path = require('path'); 
const router = express.Router()
const Joi = require('joi');
const {HttpError} = require('../../helpers/index.js');
const contacts = require('../../models/contacts.js');

const newSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = newSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
      const result = await contacts.removeContact(req.params.contactId);
      if (!result) {
        throw HttpError(404, 'Not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = newSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
