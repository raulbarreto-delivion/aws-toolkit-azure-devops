import tl = require('vsts-task-lib/task');
import path = require('path');
import TaskParameters = require('./helpers/taskParameters');
import TaskOperationHelpers = require('./helpers/taskOperations');
import sdkUserAgent = require('sdkuseragent/sdkuseragent');

function run(): Promise<void> {

    const taskManifestFile = path.join(__dirname, 'task.json');
    tl.setResourcePath(taskManifestFile);
    sdkUserAgent.setUserAgentFromManifest(taskManifestFile);

    const taskParameters = new TaskParameters.DeployTaskParameters();
    return TaskOperationHelpers.TaskOperations.deploy(taskParameters);
}

// run
run().then((result) =>
    tl.setResult(tl.TaskResult.Succeeded, '')
).catch((error) =>
    tl.setResult(tl.TaskResult.Failed, error)
);
