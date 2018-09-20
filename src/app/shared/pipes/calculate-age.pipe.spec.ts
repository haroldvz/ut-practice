import { GetAgePipe } from './calculate-age.pipe';

describe('GetAgePipe', () => {
  let pipe: GetAgePipe;
  it('create an instance', () => {
    pipe = new GetAgePipe();
    expect(pipe).toBeTruthy();
  });


  it('should calculate age from 1994-10-19 to now 2018-09-20 (23 years)', () => {
    pipe = new GetAgePipe();
    expect(pipe.transform('1994-10-19')).toBe(23);
  });
});
