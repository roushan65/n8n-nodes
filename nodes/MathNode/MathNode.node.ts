import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";


export class MathNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Math Node',
		name: 'mathNode',
		group: ['transform'],
		version: 1,
		description: 'Basic Math Node',
		defaults: {
			name: 'Math Node default',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'First Number',
				name: 'num1Key',
				type: 'string',
				default: 'num1',
				required: true,
			},
			{
				displayName: 'Select Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: '+',
						value: '+',
					}
				],
				default: '+',
				required: true,
			},
			{
				displayName: 'Second Number',
				name: 'num2Key',
				type: 'string',
				default: 'num2',
				required: true,
			}
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		let items = this.getInputData()
		let num1Key = this.getNodeParameter("num1Key", 0, 'num1') as string;
		let num2Key = this.getNodeParameter("num2Key", 0, 'num2') as string;
		let operation = this.getNodeParameter("operation", 0, '') as string;
		items.forEach((item)=>{
			console.log(item.json[num1Key] as string + "  " + parseInt(item.json[num2Key] as string))
			item.json.result = calculate(item.json[num1Key] as number, item.json[num2Key] as number, operation);
		})

		return this.prepareOutputData(items)
	}

	calculate(num1: number, num2: number , operation: string): number|null {
		let result = null;
		switch(operation) {
			case '+':
				result = num1 + num2;
				break;
			case '-':
					result = num1 - num2;
					break;
		}
		return result
	}
}
