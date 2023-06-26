import { FetchType } from "./fetch.js"

export async function benchmark(
    benchmarkedFunction: (customFetch: FetchType) => Promise<any>,
    repeatCount?: number) {
    if (!repeatCount)
        repeatCount = 1

    let testResults: { time: number, byteSize: number }[] = []
    let byteSize = 0
    // const makeReq = 
    for (let i = 0; i < repeatCount; i++) {
        byteSize = 0
        let start = Date.now()

        await benchmarkedFunction(async (add: Request, fetchSettings?: FetchRequestInit) => {
            // console.log(add, fetchSettings)
            let res = await fetch(add, fetchSettings)
            // console.log(res.ok)
            // console.log(res.status)
            let blob = await res.blob()
            // console.log(await blob.json())
            byteSize += blob.size
            return await blob.json()
        })
        let end = Date.now()


        testResults.push({ time: ((end - start) / 1000), byteSize })
    }
    let averageTime = 0
    let averageMBSize = 0

    testResults.forEach((e) => {
        averageTime += e.time
        averageMBSize += e.byteSize
    })
    averageTime /= testResults.length
    averageMBSize /= testResults.length
    averageMBSize /= 1000000

    console.log("Results:")
    // console.log(repeatCount, " runs")
    console.log("Time: ", averageTime, "s")
    console.log("Avg Requests per second:", 1000 / averageTime)
    console.log("Size in MB: ", averageMBSize)
    console.log("________________________")

}

