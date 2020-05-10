interface sleepUnit {
	nextStack: Function[]
	currentFn: Function
}

enum Status {
	AWAKE,
	SLEEP
}

const methodsDecorator = (): ParameterDecorator => (...arg) => {
	console.log(arg)
}

class LazyMan {
	private sleepTimes: number = 0
	private sleepUnits: sleepUnit[] = []
	private status: Status = Status.AWAKE

	constructor(@methodsDecorator() private readonly name: string) {
		this.init()
		setTimeout(() => {
			this.execSleeps()
		})
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
		if (this.status === Status.SLEEP) {
			this.sleepTimes++
		}
		this.status = Status.SLEEP
		this.createSleepUnits((index: number) => (
			new Promise<void>((r) => {
				window.setTimeout(() => {
					console.log('sleep....')
					this.execNextStack(index)
					r()
				}, time)
			})
		))
		
		return this
	}

	private  async execSleeps() {
		if(this.sleepTimes === this.sleepUnits.length - 1) {
			let index = 0
			for (const sleepUnit of this.sleepUnits) {
				await sleepUnit.currentFn(index)
				index++
			}
		}
	}


	public eat(sth: string) {
		const handleEat = () => {
			console.log(`eating ${sth}`)
		}
		switch (this.status) {
			case Status.AWAKE:
				handleEat()
				break
			case Status.SLEEP:
				this.addNextStack(handleEat)
				break
		}
		return this
	}

	private addNextStack(fn: Function) {
		this.sleepUnits[this.sleepTimes].nextStack.push(fn)
	}

	private execNextStack(sleepTimes: number) {
		this.sleepUnits[sleepTimes].nextStack.forEach(fn => fn())
	}
}

new LazyMan('Tony')
	.eat('breakfast')
	.sleep(1000)
	.eat('lunch')
	.sleep(1000)
	.eat('dinner')