"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
const router = (0, express_1.Router)();
router.get("/", ProjectController_1.getProjects);
router.post("/", ProjectController_1.createProject);
exports.default = router;
