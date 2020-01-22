import { TestService, AsserterService, Test, BeforeTests, Container, Logger, AfterTests } from "@plugcore/core";

@TestService()
export class UtilsTestClass extends AsserterService {

	private log: Logger;

	// This method is executed before all methods decorateds with @Tests
	@BeforeTests()
	public async beforeTests() {
		// A manual way to get services from the dependency injection container
		this.log = await Container.get(Logger);
		this.log.info('Before tests');
	}

	// This method is executed after all methods decorateds with @Tests
	@AfterTests()
	public async afterTests() {
		this.log.info('After tests');
	}

	// Usually you will have many classes with a lot of tests
	// But while you are developing something specific you can
	// focus on just one test. All @BeforeTests and @AfterTests
	// methods will be executed, but only the methods with this
	// option will be executed. If a class has non of the it will
	// be skipped. This also can be done at class level
	@Test()
	public basicTest() {

		// Inside tests we can call any of this.asset methods we 
		// want, if anything fails, then the test fails
		this.log.info('Tests execution');
		this.assert.deepEqual({ a: 1, b: "2" }, { a: 1, b: "2" });
		this.assert.notDeepEqual({ a: 1, b: "2" }, { a: 3, b: "4" });
		this.assert.ok(1);
		this.assert.equal('2', '2');
		this.assert.notEqual(3, '3');

	}

}
