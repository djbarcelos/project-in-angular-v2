import { ProjectInAngularV2Page } from './app.po';

describe('project-in-angular-v2 App', () => {
  let page: ProjectInAngularV2Page;

  beforeEach(() => {
    page = new ProjectInAngularV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
