
import { API } from "../routesConstant";
import { Crud } from "../../utils/request/crud";

const express = require('express');
const category = express.Router();

const crud = new Crud(category);

import { SaveCategoryDomain } from "../../domain/category/SaveCategoryDomain";

crud.post(API.category.updateCategory, SaveCategoryDomain);


module.exports = category;
