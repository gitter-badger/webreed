// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";
import {ResourceType} from "webreed-core/lib/ResourceType";

import setupBinaryMode from "webreed-binary-mode";
import setupJsonHandler from "webreed-json-handler";
import setupNunjucksTemplateEngine from "webreed-nunjucks-template-engine";
import setupStandardGenerator from "webreed-standard-generator";
import setupTemplateTransformer from "webreed-template-transformer";
import setupTextMode from "webreed-text-mode";
import setupYamlHandler from "webreed-yaml-handler";


export default function setup(projectRootPath: string, config: any = null): Environment {
  if (typeof projectRootPath !== "string") {
    throw new TypeError("argument 'projectRootPath' must be a string");
  }
  if (projectRootPath.trim() === "") {
    throw new Error("argument 'projectRootPath' must be a non-empty string");
  }
  if (typeof config !== "object") {
    throw new TypeError("argument 'config' must be `null` or an object");
  }

  let env = new Environment();
  env.projectRootPath = projectRootPath;

  setupFallbackResourceType(env);
  setupDefaultPlugins(env);

  return env;
}


function setupFallbackResourceType(env: Environment): void {
  let fallbackResourceType = new ResourceType();
  fallbackResourceType.mode = "binary";
  env.resourceTypes.set("*", fallbackResourceType);
}

function setupDefaultPlugins(env: Environment): void {
  env
    .use(setupBinaryMode)
    .use(setupTextMode)
    .use(setupStandardGenerator)
    .use(setupTemplateTransformer)
    .use(setupJsonHandler)
    .use(setupYamlHandler)
    .use(setupNunjucksTemplateEngine);
}
