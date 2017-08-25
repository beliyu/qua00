import { Qua00Page } from './app.po';

describe('qua00 App', () => {
  let page: Qua00Page;

  beforeEach(() => {
    page = new Qua00Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
