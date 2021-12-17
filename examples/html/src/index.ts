import { SubspaceClient, Identity } from "subspace.js";

const NODE_WS_PROVIDER = 'ws://localhost:9944'
const FARMER_WS_PROVIDER = 'ws://localhost:9944'

const htmlObjectId = document.getElementById('objectId') as HTMLHeadElement
const inputImageHtml = document.getElementById('inputImage') as HTMLImageElement
const htmlResultImage = document.getElementById('resultImage') as HTMLImageElement

(document.getElementById("fileInput") as HTMLImageElement).addEventListener("change", loadFileImage, false);
(document.getElementById("putObjectBtn") as HTMLButtonElement).addEventListener("click", putObject, false);
(document.getElementById("getObjectBtn") as HTMLButtonElement).addEventListener("click", getObject, false);

let subspaceClient: SubspaceClient
let imageData: any, object: any, objectId: any

async function putObject() {
    if (!imageData) return alert('Select an image first.')
    objectId = await subspaceClient.putObject(imageData)
    htmlObjectId.innerHTML = 'objectId: ' + objectId
}

async function getObject() {
    if (!objectId) return alert('Put the file first.')
    object = await subspaceClient.getObject(objectId)

    const b64encoded = btoa(String.fromCharCode.apply(null, object))
    htmlResultImage.src = `data:image/*;base64,${b64encoded}`
}

function loadFileImage(e: any) {
    let files = e.target.files
    if (files && files.length) {
        const image = files[0]
        let frAsUrl = new FileReader()
        let frAsArrayBuffer = new FileReader()

        frAsUrl.onload = function () {
            inputImageHtml.src = frAsUrl.result?.toString() || ''
        }
        frAsUrl.readAsDataURL(image)

        frAsArrayBuffer.onload = function () {
            if (frAsArrayBuffer.result)
                imageData = new Uint8Array(frAsArrayBuffer.result as ArrayBuffer)
        }
        frAsArrayBuffer.readAsArrayBuffer(image)
    }
}

async function init() {
    const identity = await Identity.fromWeb3()
    subspaceClient = await SubspaceClient.connect(
        identity,
        NODE_WS_PROVIDER,
        FARMER_WS_PROVIDER,
    )
    const address = identity.getKeyringPair().address;
    (document.getElementById('injectedAccount') as HTMLHeadingElement).innerHTML = address
}

setTimeout(init, 2000)