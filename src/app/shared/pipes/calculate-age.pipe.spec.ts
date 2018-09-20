import { GetAgePipe } from './calculate-age.pipe';

describe('CalculateAgePipe', () => {
  let pipe: GetAgePipe;
  it('create an instance', () => {
    pipe = new GetAgePipe();
    expect(pipe).toBeTruthy();
  });
});
