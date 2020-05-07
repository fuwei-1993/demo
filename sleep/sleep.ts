interface sleepUnit {
	nextStack: Function[]
	currentFn: Function
}

enum Status {
	AWAKE,
	SLEEP
}

class LazyMan {
	private sleepTimes: number = 0
	private sleepUnits: sleepUnit[] = []
	private status: Status = Status.AWAKE

	constructor(private readonly name: string) {
		this.init()

	}

	private init() {
		console.log(`Hey I am ${this.name}`)
	}

	private createSleepUnits(currentFn: Function) {

		this.sleepUnits[this.sleepTimes] = {
			currentFn,
			nextStack: []
		}
	}

	public sleep(time: number) {
		this.status = Status.SLEEP
		this.createSleepUnits(() => {
			setTimeout(() => {
				console.log('sleep....')
				this.execNextStack()
			}, time)
		})
		this.sleepTimes++
		return this
	}

	private execSleeps() {
		
	}

	public eat(sth: string) {
		const handleEat = () => {
			console.log(`eating ${sth}`)
		}
		switch (this.status) {
			case Status.AWAKE:
				handleEat()
			case Status.SLEEP:
				this.addNextStack(handleEat)
				break
		}
		return this
	}

	private addNextStack(fn: Function) {
		this.sleepUnits[this.sleepTimes].nextStack.push(fn)
	}

	private execNextStack() {
		this.sleepUnits[this.sleepTimes].nextStack.forEach(fn => fn())
	}
}

new LazyMan('Tony')
	.eat('breakfast')
	.sleep(1000)
	.eat('lunch')
	.sleep(1000)
	.eat('dinner')