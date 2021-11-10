describe("node-assert-2-jest-expect", () => {
  it("assert", () => {
    const one = 1;
    fake(one);
    const fake = fake();
    const fakeComponent = fake(<Fake />);
  });
});