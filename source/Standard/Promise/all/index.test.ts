import { expect } from 'chai';
import testee from './index';

describe( 'all', () => {

	describe( 'run', () => {

		it( 'promise', () => {
			const promise = testee( [
				( a: number, b: number ): number => a + b,
				( a: number, b: number ): number => a - b,
				( a: number, b: number ): number => a * b
			], 2 );
			expect( promise ).to.be.an.instanceof( Promise );
		} );

		it( 'result', () => {
			return testee( [
				( ( a: number, b: number ): number => a + b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a - b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a * b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a % b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a ^ b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a & b ).bind( undefined, 1, 2 )
			],
				3 )
				.then( ( payload ) => {
					expect( payload ).to.be.an.instanceof( Array );
					expect( payload ).to.be.deep.equal( [3, -1, 2, 1, 3, 0] );
				} );
		} );

	} );

	describe( 'throws', () => {

		it( 'invalid concurrency', () => {
			return testee( [
				( ( a: number, b: number ): number => a + b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a - b ).bind( undefined, 1, 2 ),
			],
				-3 )
				.catch( ( error ) => error )
				.then( ( payload ) => {
					expect( payload ).to.be.an.instanceof( Error );
					expect( payload.message ).to.equal( 'Second argument must be a positive Integer. Got: -3' );
				} );
		} );

		it( 'function throw', () => {
			const MESSAGE = '=(';

			return testee( [
				( ( a: number, b: number ): number => a + b ).bind( undefined, 1, 2 ),
				(): never => {
					throw new Error( MESSAGE );
				},
				( ( a: number, b: number ): number => a - b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a * b ).bind( undefined, 1, 2 ),
				( ( a: number, b: number ): number => a ^ b ).bind( undefined, 1, 2 )
			],
				2 )
				.catch( ( error ) => error )
				.then( ( payload ) => {
					expect( payload ).to.be.an.instanceof( Error );
					expect( payload.message ).to.equal( MESSAGE );
				} );
		} );

	} );

} );
