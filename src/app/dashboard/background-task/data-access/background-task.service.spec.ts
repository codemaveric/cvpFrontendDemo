import { TestBed } from '@angular/core/testing';

import { BackgroundTaskService } from './background-task.service';

describe('BackgroundTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundTaskService = TestBed.get(BackgroundTaskService);
    expect(service).toBeTruthy();
  });
});
