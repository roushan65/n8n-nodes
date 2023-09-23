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
					},
					{
						name: '-',
						value: '-',
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
		let operation = this.getNodeParameter("operation", 0, '') as string;

		for(let itemIndex=0; itemIndex<items.length; itemIndex++) {
			let num1 = this.getNodeParameter("num1Key", itemIndex, '0') as number;
			let num2 = this.getNodeParameter("num2Key", itemIndex, '0') as number;
			items[itemIndex].json.result = MathNode.calculate(num1, num2, operation);
		}

		return this.prepareOutputData(items)
	}

	static calculate(num1: number, num2: number , operation: string): number|null {
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
