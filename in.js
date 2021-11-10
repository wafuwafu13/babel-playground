describe("node-assert-2-jest-expect", () => {
  it("assert", () => {
    const fake = fake();
    const fakeComponent = fake(<Fake />);
    assert(<Fake />);
    assert(fake.fake(<fake />));
  });
});
